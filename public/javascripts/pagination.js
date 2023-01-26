const paginate = document.getElementById('paginate');
const $campgroundsContainer = $('#campgrounds-container');
paginate.addEventListener('click', function (e) {
    e.preventDefault();
    fetch(this.href)
        .then(response => response.json())
        .then(data => {
            for (const campground of data.docs) {
                let template = generateCampground(campground);
                $campgroundsContainer.append(template);
            }
            let { nextPage } = data;
            this.href = this.href.replace(/page=\d+/, `page=${nextPage}`);
        })
        .catch(err => console.log('ERROR', err));
})

function generateCampground(campground) {
    let template = `<div class="card mb-3">
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" alt="" src="${campground.images.length ? campground.images[0].url : 'https://res.cloudinary.com/dw0rkoozx/image/upload/v1625151568/YelpCamp/vtjiotlo4qjjzhvmjqbu.jpg'}" crossorigin>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${campground.name}</h5>
                        <p class="card-text">
                            <small class="text-muted">${campground.location}</small>
                        </p>
                        <p class="card-text text-truncate">${campground.description}</p>
                        <a href="/campgrounds/${campground._id}" class="btn btn-primary">View ${campground.name}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    return template;
}