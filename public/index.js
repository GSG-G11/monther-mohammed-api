const nameElement = getElement("github-user-handle");
const avatarElement = getElement("github-user-avatar");
const numOfReposElement = getElement("github-user-repos");
const reposLanguageElement = getElement("github-repos-languages");
const totalStarsElement = getElement("github-repos-stars");

const repoNameElement = getElement("github-repo-name");;
const createdElement = getElement("github-repo-created");
const numOfOpenIssuesElement = getElement("github-repo-open-issues");
const peopleWatchingElement = getElement("github-repo-watchers");
const contributorsElement = getElement("github-repo-contributors");


const username = "Mohammed-Hamada"

const userUrl = function(username) {
    return `https://api.github.com/users/${username}`;
}


const reposUrl = function(callback, username) {
    return callback(username) + `/repos`
}

const contributorsUrl = function(repo) {
    return `https://api.github.com/repos/Mohammed-Hamada/${repo}/contributors`
}

function getElement(element) {
    return document.getElementById(element);
}

function fetch(callback, url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            callback(data);
        }
    }
    xhr.open('GET', url);
    xhr.send()
}

function userData(data) {
    nameElement.textContent = data.name;
    avatarElement.src = data.avatar_url;
    numOfReposElement.textContent = data.public_repos;

}
let arr = [];

function removeNull(array) {
    return array.filter(x => x !== null)
};

function reposData(data) {
    repoNameElement.textContent = data[4].name;
    createdElement.textContent = data[4].created_at;
    numOfOpenIssuesElement.textContent = data[4].open_issues_count;
    peopleWatchingElement.textContent = data[4].watchers;
    data.forEach(element => {
        arr.push(element.language);
    });
    arr = [...new Set(arr)].filter((element) => element !== null);
    console.log(arr);
    reposLanguageElement.textContent = arr.join('');
}

function contributorsData(data) {
    let counter = 0;
    data.forEach(element => {
        counter += element.contributions;
    });
    contributorsElement.textContent = counter;
}

fetch(userData, userUrl('Mohammed-Hamada'));
fetch(reposData, reposUrl(userUrl, 'Mohammed-Hamada'))
fetch(contributorsData, contributorsUrl("Coding-Foundations-course"))