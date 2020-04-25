import Tone from 'tone'

import store from "../redux/store"

import { getRandomElement } from "../utils/helpers"


export default class AudioModule {
    constructor() {
        this.activeTodo = null
        this.monoSynths = {
            'sin' : new Tone.Synth().set({
                "oscillator" : { "type" : 'sine' },
                "volume" : -5
            }).toMaster(),
            'tri' : new Tone.Synth().set({
                "oscillator" : { "type" : 'triangle' },
                "volume" : -10
            }).toMaster(),
            'squ' : new Tone.Synth().set({
                "oscillator" : { "type" : 'square' },
                "volume" : -20
            }).toMaster(),
            'saw' : new Tone.Synth().set({
                "oscillator" : { "type" : 'sawtooth' },
                "volume" : -19
            }).toMaster()
        }
        this.polySynths = {
            'sin' : new Tone.PolySynth().set({
                "oscillator" : { "type" : 'sine' },
                "volume" : 0
            }).toMaster(),
            'tri' : new Tone.PolySynth().set({
                "oscillator" : { "type" : 'triangle' },
                "volume" : -5
            }).toMaster(),
            'squ' : new Tone.PolySynth().set({
                "oscillator" : { "type" : 'square' },
                "volume" : -15
            }).toMaster(),
            'saw' : new Tone.PolySynth().set({
                "oscillator" : { "type" : 'sawtooth' },
                "volume" : -14
            }).toMaster()
        }

        this.loop = new Tone.Loop(time => {

            // console.log(time)
            const note = getRandomElement(this.activeTodo.pitchSet)
            if (!this.activeTodo.waiting && Math.random()*100 < this.activeTodo.percent ) {
                const synthWave = getRandomElement(this.activeTodo.synthWaves)
                // console.log(this.activeTodo)
                if (this.activeTodo.synthType === 'poly') {
                    this.polySynths[synthWave].triggerAttackRelease(note, this.activeTodo.duration)
                } else {
                    this.monoSynths[synthWave].triggerAttackRelease(note, this.activeTodo.duration)
                }
            }

            const waitOrPlay = this.activeTodo.waiting ? this.activeTodo.waitTime : this.activeTodo.playTime
            const timeCheck = this.timeTag + waitOrPlay
            // console.log('seconds', Tone.Transport.seconds)
            if (Tone.Transport.seconds >= timeCheck) {
                this.updateAudioStatus()
                this.timeTag = Tone.Transport.seconds
            }


        }, "8n").start(0)

        this.timeTag = null

    }



    // UPDATE PLAY STATUS AND INSTRUMENT PARAMS
    updateAudioStatus = () => {  // changeAudioPlayStatus
        console.log('updateAudioStatus')
        const state = store.getState()
        const { nowPlaying, isPlaying } = state.todos
        this.activeTodo = nowPlaying.model
        if (isPlaying === false) {
            this.stop()
        } else {
            const envelope = {
                attack: this.activeTodo.envelope.attack,
                decay: this.activeTodo.envelope.decay,
                sustain: this.activeTodo.envelope.sustain,
                release: this.activeTodo.envelope.release
            }
            for (const type in this.polySynths) {
                this.polySynths[type].set({envelope: envelope})
                // console.log('env', this.polySynths[type])
            }
            for (const type in this.monoSynths) {
                this.monoSynths[type].set( { envelope: envelope } )
                // console.log('env', this.monoSynths[type])
                this.monoSynths[type].portamento = this.activeTodo.portamento
            }
                // this.monoSynths[type].envelope.attack = this.activeTodo.envelope.attack
                // this.monoSynths[type].envelope.decay = this.activeTodo.envelope.decay
                // this.monoSynths[type].envelope.sustain = this.activeTodo.envelope.sustain
                // this.monoSynths[type].envelope.release = this.activeTodo.envelope.release

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values
            if (this.activeTodo.tempo !== Tone.Transport.bpm.value) {
                Tone.Transport.bpm.value = this.activeTodo.tempo
            }
            this.timeTag = Tone.Transport.seconds
            // console.log('timeTag', this.timeTag)
            this.start() // can compare to Tone.Transport.state (started, stopped, paused)
        }

    }

    start = () => {
        Tone.Transport.start();
    }

    stop = () => {
        console.log('stopped')
        Tone.Transport.stop();
        for (const type in this.polySynths) {
            this.polySynths[type].triggerRelease()
        }
        for (const type in this.monoSynths) {
            this.monoSynths[type].triggerRelease()
        }
    }
}
