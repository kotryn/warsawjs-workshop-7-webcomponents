class MockupElement extends HTMLElement {
    constructor(){
        super();
        console.log('new MockapElement');
        this.shadow = this.attachShadow({mode: 'open'});
        console.log(this.shadow);
    }

    connectedCallback(){
        console.log('MockapElement#connectedCallback');

        this.shadow.innerHTML = document.querySelector('template').innerHTML;
        this.shadow.querySelector('img').setAttribute('src',this.attributes.image.value);

        console.log(template);
    }
}

window.customElements.define('mockup-element', MockupElement);
