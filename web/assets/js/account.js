import { getUser } from './userSession.js';

const user = getUser();
if (user) {
    fetch(`/api/account/${user.username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to retrieve reviews');
            }
            return response.json();
        })
        .then(data => {
            renderReviews(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function renderReviews(reviews) {
    const reviewsContainer = document.querySelector('.reviews-container');
    reviewsContainer.innerHTML = '';

    const username = document.querySelector('#username');
    username.textContent = user.username;

    const email = document.querySelector('#email');
    email.textContent = user.email;

    reviews.forEach(review => {
        const reviewHtml = `
            <div class="mb-6 border-b-4">
                <div class="flex justify-between flex-wrap gap-2 w-full">
                    <span class="text-gray-700 font-bold">${review.course}</span>
                    <span class="text-gray-700 font-bold">By ${review.instructor}</span>
                    <p class="flex items-center gap-2  w-full mb-2">
                        ${generateRatingStars(review.rating)}
                    </p>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">${new Date(review.date).toLocaleDateString()}</time>
                </div>
                <p class=" text-lg my-4">
                    ${review.comment}
                </p>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Modify</button>
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
            </div>
        `;
        reviewsContainer.innerHTML += reviewHtml;
    });
}


function generateRatingStars(rating) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path fill="#FBBF24" d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"/>
            </svg>`;
        } else {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path fill="#E5E7EB" d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"/>
            </svg>`;
        }
    }
    return starsHtml;
}