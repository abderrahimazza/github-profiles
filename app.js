const AIPURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getUser("abderrahimazza");
function getUser(username) {
    fetch(AIPURL + username).then(
        function (res) {
            return res.json();
            // console.log(res.json());
        }
    ).then(
        function (data) {
            showData(data);
            getRepos(username);
        }
    )
}

function getRepos(username) {
    fetch(AIPURL + username + "/repos").then(
        function (res) {
            return res.json();
        }
    ).then(
        function (data) {
           showRepos(data);
        }
    )
}

function showData(user) {
    main.classList.add("card");
    let dataCard = `
    <div>
        <img src="${user.avatar_url}">
    </div>
    <div>
        <div class="user_info">
            <h3>${user.name}</h3>
            <p>${user.bio ? user.bio : "bio..."}</p>
            <p><i class="fa fa-map-marker" aria-hidden="true"></i> ${user.location ? user.location : "..."}</p>
            <p><i class="fa fa-twitter" aria-hidden="true"></i> ${user.twitter_username ? user.twitter_username : "..."}</p>
            <p><i class="fa fa-envelope" aria-hidden="true"></i> ${user.email ? user.email : "..."}</p>
        </div>
        <div class="info">
            <ul>
                <li> <i class="fa fa-eye" aria-hidden="true"></i> ${user.followers ? user.followers : 0}</li>
                <li> <i class="fa fa-heart" aria-hidden="true"></i> ${user.following ? user.following : 0}</li>
                <li> <i class="fa fa-code-fork" aria-hidden="true"></i> ${user.public_repos ? user.public_repos : 0}</li>
            </ul>
        </div>
        <div id="repos"></div>

    </div>
    `;
    main.innerHTML = dataCard;
}

function showRepos(repos) {
    const elRepos = document.getElementById("repos");

    repos.slice(0, 10).forEach(e => {

        const rep = document.createElement("a");
        rep.href = e.html_url;
        rep.target = "_blank";
        rep.innerText = e.name;
        rep.classList.add('link');
        elRepos.appendChild(rep);

    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = search.value;
    if (user) {
        getUser(user)

        search.value = "";
    }
})