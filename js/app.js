let number = 0;
const videoArea = document.getElementById("video");
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const button = document.getElementById('btn');
let data = [];

function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        resolve(request.response);
                    } else {
                        reject("Something went wrong");
                    }
                }
            }

            request.open("GET", "data.json");
            request.responseType = "json";
            request.send(null);
        }, 0)
    })
}

function changeVideo() {
    console.log(data.length);

    button.addEventListener("click", () => {
        if (data.length <= 0) {
            getData()
                .then(res => {
                    data = res;
                    showElements();
                })
                .catch(err => console.log(err));
        } else {
            showElements();
        }
    });
}

function showElements() {
    titleArea.innerHTML = data[number].title;
    contentArea.innerHTML = data[number].content;
    videoArea.setAttribute("src", data[number].url);
    number == 2 ? number = 0 : number++;
}

window.onload = changeVideo;