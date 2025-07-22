import { data } from "./data.js";

const AudioController = {
    state: {
        aduios: [],
        current: {},
        playing: false,
        volumes: 0.5
    },

    init() {
        this.initVariables()
        this.renderAudios()
        this.initEvent()
    },

    initVariables() {
        this.audioList = document.querySelector('.items')
        this.currentList = document.querySelector('.current')
        this.volume = document.querySelector('.controls')
    },

    initEvent() {
        this.audioList.addEventListener('click', this.handleCl.bind(this))
        this.volume.addEventListener('change', this.handleVol.bind(this))
    },

    handleVol({target:{value}}){
        const {current} = this.state
        this.state.volumes = value
        if(!current?.audio) return

        current.audio.volume = value
    },

    handleAudioPlay(){
        const { playing, current } = this.state
        const { audio } = current

        !playing ? audio.play() : audio.pause();

        this.state.playing = !playing
    },

    handleNext(){
        const { current } = this.state
        const {id} = current
        const next = +id + 1
        if(!next) return 

        this.setCurrent(next)
    },  

    handlePrev(){
        const { current } = this.state
        const {id} = current
        const prev = +id - 1
        if(!prev) return 

        this.setCurrent(prev)
    },

    handelPlayer(){
        const play = document.querySelector('.play')
        const next = document.querySelector('.play-right')
        const prev = document.querySelector('.play-left')

        play.addEventListener('click', this.handleAudioPlay.bind(this))
        next.addEventListener('click', this.handleNext.bind(this))
        prev.addEventListener('click', this.handlePrev.bind(this))

    },

    renderCurrent(current){
        const {link, track} = current
        const [imges] = link.split('.')
        const item =  `
        <div class="current-img" style="background-image: url(img/${imges}.jpg)"></div>
            <div class="current-info">
                <div class="current-info__top">
                    <h2>${track}</h2>
                </div>
                <div class="current-info__bt">
                    <button class="play-left">
                        <img class="arrow-left" src="img/svg/fast.svg" alt="fast">
                    </button>
                    <button class="play">
                        <img src="img/svg/play.svg" alt="play">
                    </button>
                    <button class="play-right">
                        <img src="img/svg/fast.svg" alt="fast">
                    </button>
                </div>
        </div>
        `
        this.currentList.innerHTML = item
        this.handelPlayer()
    },

    pauseAudio(){
        const {current:{audio}} = this.state
        if(!audio) return
        audio.pause()
    },

    setCurrent(itemId){
        const current = this.state.aduios.find(({id}) => +id === +itemId)
        if(!current) return

        this.pauseAudio()
        this.state.current = current
        current.audio.volume = this.state.volumes
        this.renderCurrent(current)
        
    },

    handleCl({target}){
        const {id} = target.dataset
        if(!id) return

        this.setCurrent(id)
    },

    loadAudio(audio){
        const { id, link, track } = audio
        const [imges] = link.split('.')
        const item = 
        `
        <div class="item" data-id="${id}">
            <div class="item-img" style="background-image: url(img/${imges}.jpg)"></div>
            <h3 class="item-track">${track}</h3>
        </div>
        `
        this.audioList.innerHTML += item
    },

    renderAudios(){
        data.forEach((item) => {
            const audio = new Audio(`./audio/${item.link}`)
            const newItem = {...item, audio}

            this.state.aduios.push(newItem)
            this.loadAudio(newItem)
        })
    }
}

AudioController.init()