/*class MockupElement extends HTMLElement {
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

 window.customElements.define('mockup-element', MockupElement);*/

class GithubMockupElement extends HTMLElement {
    constructor() {
        super();
        console.log('git');
        this.shadow = this.attachShadow({mode: 'open'});
        console.log(this.shadow);
    }

    connectedCallback() {
        console.log('gitttt');

        this.shadow.innerHTML = document.currentScript.ownerDocument.querySelector('template').innerHTML;



        //this.shadow.querySelector('h1').innerHTML = this.attributes.label.value;


        this._fetch_github_profile();
        this._fetch_github_profile_2();


       // this.shadow.querySelector('img').setAttribute('src', );


    }

    _fetch_github_profile() {
        var request = new Request('./github-profile-card-element/mocks/github-piecioshka-profile.json', {
            /*headers: new Headers({
             'Content-Type': 'text/plain'
             })*/
        });

        return fetch(request)

            .then((response) => {
                response = response.json();
                console.log(response);
                return response;
            })

            .then((data) => {
                console.log('........');
                console.log(data.avatar_url);

                this.shadow.querySelector('img').setAttribute('src', data.avatar_url);
                this.shadow.querySelector('.name').innerHTML = data.name;
                this.shadow.querySelector('.bio').innerHTML = data.bio;
                this.shadow.querySelector('.location').innerHTML = data.location;


                return data;
            });
    }

    _fetch_github_profile_2() {
        var request = new Request('./github-profile-card-element/mocks/github-piecioshka-repositories.json', {
            /*headers: new Headers({
             'Content-Type': 'text/plain'
             })*/
        });

        return fetch(request)

            .then((response) => {
                response = response.json();
                console.log(response);
                return response;
            })

            .then((data) => {
                console.log('........');
                console.log(data[0].stargazers_count);

                this.shadow.querySelector('.star').innerHTML = this._github_star(data);


                return data;
            });
    }

    _github_star(data){
        let temp = '';
        //let sortedData = data.cloneNode();
        data.sort(function(a,b) {return (a.stargazers_count < b.stargazers_count) ? 1 : ((b.stargazers_count < a.stargazers_count) ? -1 : 0);} );

        for (let i = 0; i < 9; i++){
            temp =  temp + '<li class="star_image">'+data[i].stargazers_count + ' ☆ </li><li>' + data[i].name + '</li>';
        }
        return temp;
    }


}

window.customElements.define('github-profile-card-element', GithubMockupElement);
