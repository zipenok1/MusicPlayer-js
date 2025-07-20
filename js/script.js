import { data } from "./data.js";

const AudioController = {
    state: {
        aduios: [],
        current: {}
    },

    init() {
        this.initVariables()
        this.renderAudios()
        this.initEvent()
    },

    initVariables() {
        this.audioList = document.querySelector('.items')
        this.currentList = document.querySelector('.current')
    },

    initEvent() {
        this.audioList.addEventListener('click', this.handleCl.bind(this))
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
                    <button>
                        <img class="arrow-left" src="img/svg/fast.svg" alt="fast">
                    </button>
                    <button>
                        <img src="img/svg/play.svg" alt="play">
                    </button>
                    <button>
                        <img src="img/svg/fast.svg" alt="fast">
                    </button>
                </div>
            <div class="current-info__progress"><span></span></div>
        </div>
        `
        this.currentList.innerHTML = item
    },

    setCurrent(itemId){
        const current = this.state.aduios.find(({id}) => +id === +itemId)
        console.log(current);
        if(!current) return

        this.state.current = current
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