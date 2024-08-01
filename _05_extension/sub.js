// 音声合成用ＵＲＬ（scratch.mit.edu）
const SERVER_HOST = "https://synthesis-service.scratch.mit.edu";

const TestJS = class{
    constructor() {
        /** 音声データをキャッシュするためのマップ */
        this.soundPlayerCache = new Map();
    }
    /**
     * 生成したＵＲＬを使って音声データを取得し再生する。
     * 本メソッド内では「this」を使っていないので、アロー関数としている。
     * @param {*} url 
     * @param {*} util 
     * @returns 
     */
    _playSpeech = async (url, util) => {
        const target = util.target;
        try{
            const success = await this._speechWithAudioEngine(url, target);
            if (!success) {
                return await this._speechWithAudioElement(url, target);
            }
        }catch(e){
            console.warn(`Speechに失敗しました。${url}`, e);
        }
    }
    /**
     * Scratch3 AudioEngineを使って再生する
     * 音ブロックの音量の指定は AudioEngineの再生時に自動的に反映されるので
     * 本スクリプトにて指定する必要はない。
     * 本メソッド内では「this」を使っていないので、アロー関数としている。
     * @param {*} url 
     * @param {*} target 
     * @returns 成功(True),失敗(False)
     */
    _speechWithAudioEngine = async (url, target) => {
        const soundBank = target.sprite.soundBank;
        let soundPlayer;
        try{
            const originalSoundPlayer = await this._decodeSoundPlayer(url);
            soundPlayer = originalSoundPlayer.take();
        }catch(e){
            console.warn("音声データの取得に失敗しました。",e);
            return false;
        }
        soundBank.addSoundPlayer(soundPlayer);
        // 再生する（話す）
        await soundBank.playSound(target, soundPlayer.id);
        // 再生が終わったらSoundBankから除去する
        delete soundBank.soundPlayers[soundPlayer.id];
        soundBank.playerTargets.delete(soundPlayer.id);
        soundBank.soundEffects.delete(soundPlayer.id);
        return true;
    }    
    /**
     * ＵＲＬをもとに音声データを取り込む。
     * @param {*} url 
     * @returns 取得した音声データ
     */
    _decodeSoundPlayer = async (url) => {
        const cached = this.soundPlayerCache.get(url);
        // キャッシュされているとき
        if (cached) {
            if (cached.sound) {
                return cached.sound;
            }
            throw cached.error;
        }
        // キャッシュされていないとき（はじめての話すワードの場合）
        try{
            // Turbowarpで動作するとき グローバル変数Scratchが存在している。
            const audioEngine = Scratch.vm.runtime.audioEngine;
            // 音声データを取得する
            const arrayBuffer = await this._fetchAsArrayBufferWithTimeout(url);
            // 音声データをもとにSoundPlayerを作る。
            const soundPlayer = await audioEngine.decodeSoundPlayer({
                data: {
                    buffer: arrayBuffer,
                }
            });
            // キャッシュする
            this.soundPlayerCache.set(url, {
                sound: soundPlayer,
                error:null,
            });
            return soundPlayer;
        }catch(e){
            this.soundPlayerCache.set(url, {
                sound: null,
                error: e,
            });
            throw e;
        }
    }
    /**
     * 音声データを返す。
     * @param {*} url 
     * @returns 応答データ（音声データ）
     */
    _fetchAsArrayBufferWithTimeout(url){
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            // 5000msec経過するとタイムアウトする定義
            let timeout = setTimeout(() => {
                // タイムアウト時はアボートする
                xhr.abort();
                reject(new Error("Timed out"));
            },5000);

            xhr.onload = () => {
                clearTimeout(timeout);
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }else{
                    reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
                }
            };
            xhr.onerror = () => {
                clearTimeout(timeout);
                reject(new Error(`Failed to request ${url}`));
            };
            xhr.responseType = "arraybuffer";
            xhr.open("GET", url);
            xhr.send();
        });
        return promise;
    }
    /**
     * Javascript標準のAudioを使って再生する
     * @param {*} url 
     * @param {*} target 
     * @returns 成功(True),失敗(False)
     */
    _speechWithAudioElement (url, target) {
    
        const promise = new Promise((resolve, reject) => {
            const mediaElement = new Audio(url);
            mediaElement.volume = target.volume / 100; // 音ブロックの音量
            mediaElement.onended = () => {
                resolve();
            };
            mediaElement.play().then(()=>{
                // 再生するまで待つ。
            }).catch((err) => {
                reject(err);
            });
        });
        return promise;
    }
    /**
     * 話す
     * @param {*} args 
     * @param {*} util 
     */
    speech(args, util) {
        let path = 
            `${SERVER_HOST}/synth`
            +`?locale=${args.locale}`
            +`&gender=${args.gender}`
            +`&text=${args.text}`;
        this._playSpeech(path, util);
    }
    /**
     * 話し終わるまで待つ
     * @param {*} args 
     * @param {*} util 
     */
    async speechAndWait(args, util ) {
        // 言語、性別、テキストをもとにＵＲＬを組み立てる。
        let path = 
            `${SERVER_HOST}/synth`
            +`?locale=${args.locale}`
            +`&gender=${args.gender}`
            +`&text=${args.text}`;
        // await をつけているので、再生が終わるまで待つ
        await this._playSpeech(path, util);

    }
}

export {TestJS};