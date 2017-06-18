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


        this._fetch_github_profile(this.shadow);
        this._fetch_github_profile_2(this.shadow);


       // this.shadow.querySelector('img').setAttribute('src', );


    }

    _fetch_github_profile(shadow) {
        var request = new Request('./github-profile-card-element/mocks/github-piecioshka-profile.json', {
            /*headers: new Headers({
             'Content-Type': 'text/plain'
             })*/
        });

        return fetch(request)

            .then(function (response) {
                response = response.json();
                console.log(response);
                return response;
            })

            .then(function(data) {
                console.log('........');
                console.log(data.avatar_url);

                shadow.querySelector('img').setAttribute('src', data.avatar_url);
                shadow.querySelector('.name').innerHTML = data.name;
                shadow.querySelector('.bio').innerHTML = data.bio;
                shadow.querySelector('.location').innerHTML = data.location;


                return data;
            });
    }

    _fetch_github_profile_2(shadow) {
        var request = new Request('./github-profile-card-element/mocks/github-piecioshka-repositories.json', {
            /*headers: new Headers({
             'Content-Type': 'text/plain'
             })*/
        });

        return fetch(request)

            .then(function (response) {
                response = response.json();
                console.log(response);
                return response;
            })

            .then(function(data) {
                console.log('........');
                console.log(data[0].stargazers_count);

                //shadow.querySelector('.star').innerHTML = data[0].stargazers_count + ' ' + data[0].name;
                
                var temp = null;
                for (var i = 0; i < 10; i++){
                    temp =  temp + '<br>'+data[i].stargazers_count + ' ' + data[i].name;
                }
                shadow.querySelector('.star').innerHTML = temp;


                return data;
            });
    }

    /*_github_star(data){
        var temp = null;
        for (i = 0; i < 10; i++){
            temp =  temp + '<br>'+data[i].stargazers_count + ' ' + data[i].name;
        }
        return temp;
    }*/


}

window.customElements.define('github-profile-card-element', GithubMockupElement);

/*
 fetch('https://davidwalsh.name/some/url', {
 method: 'get'
 }).then(function(response) {

 }).catch(function(err) {
 // Error :(
 });
 */

//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
