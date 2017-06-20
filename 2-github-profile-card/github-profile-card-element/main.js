class GithubMockupElement extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {

        this.shadow.innerHTML = document.currentScript.ownerDocument.querySelector('template').innerHTML;
        let login = this.attributes.login.value;

        this._fetch_github_profile(login);
        this._fetch_github_profile_2(login);
    }

    _fetch_github_profile(login) {
        let request = new Request('/mocks/github-piecioshka-profile.json', {});
        //let request = new Request('https://api.github.com/users/'+login, {});
        return fetch(request)

            .then((response) => {
                response = response.json();
                return response;
            })

            .then((data) => {

                this.shadow.querySelector('img').setAttribute('src', data.avatar_url);
                this.shadow.querySelector('.name').innerHTML = data.name;
                this.shadow.querySelector('.bio').innerHTML = data.bio;
                this.shadow.querySelector('.location').innerHTML = data.location;
            });
    }

    _fetch_github_profile_2(login) {
        let request = new Request('/mocks/github-piecioshka-repositories.json', { });
        //let request = new Request('https://api.github.com/users/'+login+'/repos', { });


        return fetch(request)

            .then((response) => {
                response = response.json();
                return response;
            })

            .then((data) => {

                this.shadow.querySelector('.star').innerHTML = this._github_star(data);
            });
    }

    _github_star(data){
        let temp = '';
        data.sort(function(a,b) {return (a.stargazers_count < b.stargazers_count) ? 1 : ((b.stargazers_count < a.stargazers_count) ? -1 : 0);} );

        for (let i = 0; i < 9 && i < data.length; i++){
            temp =  temp + '<li class="star_image">'+data[i].stargazers_count + ' ☆ </li><li>' + data[i].name + '</li>';
        }
        return temp;
    }


}

window.customElements.define('github-profile-card-element', GithubMockupElement);
