class MockupElement extends HTMLElement {
    constructor(){
        super();
        console.log('new MockapElement');
        this.shadow = this.attachShadow({mode: 'open'});
        console.log(this.shadow);
    }

    connectedCallback(){
        console.log('MockapElement#connectedCallback');

        this.shadow.innerHTML = document.currentScript.ownerDocument.querySelector('template').innerHTML;

        this.shadow.querySelector('img').setAttribute('src',this.attributes.image.value);
        this.shadow.querySelector('h1').innerHTML = this.attributes.label.value;


    }
}

window.customElements.define('mockup-element', MockupElement);
