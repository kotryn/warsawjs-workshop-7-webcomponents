class GithubMockupElement extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {

        this.shadow.innerHTML = document.currentScript.ownerDocument.querySelector('template').innerHTML;
        let login = this.attributes.login.value;

        this._fetchGithubProfile(login);
        this._fetchGithubProfile2(login);
    }

    _fetchGithubProfile(login) {
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

    _fetchGithubProfile2(login) {
        let request = new Request('/mocks/github-piecioshka-repositories.json', { });
        //let request = new Request('https://api.github.com/users/'+login+'/repos', { });


        return fetch(request)

            .then((response) => {
                response = response.json();
                return response;
            })

            .then((data) => {

                this.shadow.querySelector('.star').innerHTML = this._githubStar(data);
            });
    }

    _githubStar(data){
        let temp = '';
        data.sort(function(a,b) {return (a.stargazers_count < b.stargazers_count) ? 1 : ((b.stargazers_count < a.stargazers_count) ? -1 : 0);} );

        data.forEach((item) => {
            temp =  temp + '<li class="star-image">'+item.stargazers_count + ' ☆ </li><li>' + item.name + '</li>';
        });
        return temp;
    }
}

window.customElements.define('github-profile-card-element', GithubMockupElement);
