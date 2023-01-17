import { JsonPixabayApi } from './fetchRequest';
import { createImageCard } from './createImageCards';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const jsonPixabayApi = new JsonPixabayApi();
// console.log(jsonPixabayApi);

const inputForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

inputForm.addEventListener('submit', submitForm);

// console.log(inputForm.elements.searchQuery.value);

let gallery = new SimpleLightbox('.gallery a');


async function submitForm(event) {
    event.preventDefault();
    // console.log(inputForm.elements);
    
    jsonPixabayApi.query = inputForm.elements.searchQuery.value;
    jsonPixabayApi.page = 1;

    inputForm.elements.searchBtn.disabled = true;
    loadMoreBtn.classList.add('is-hidden');  //?

    try {
        const dataFromFetch = await jsonPixabayApi.fetchRequest();
        if (dataFromFetch.hits.length > 1) {
            Notify.success(`Hooray! We found ${dataFromFetch.totalHits} images.`);
        }

        if (dataFromFetch.hits.length === 0 || jsonPixabayApi.query === '') {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            event.target.reset();
            galleryContainer.innerHTML = '';
            return;
        };

        if (dataFromFetch.total > 40) {
            loadMoreBtn.classList.remove('is-hidden');
        };


        galleryContainer.innerHTML = createImageCard(dataFromFetch.hits);

        gallery.refresh();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        inputForm.elements.searchBtn.disabled = false;
    };
    
    // .then(({data}) => {
    //     Notify.success(`Hooray! We found ${data.totalHits} images.`);
       
    //     const resultArr = data.hits;
    //     if (data.hits.length === 0 || jsonPixabayApi.query === '') {
    //         Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //         event.target.reset();
    //         galleryContainer.innerHTML = '';
    //         return;
    //     };

    //     if (data.total > 40) {
    //         loadMoreBtn.classList.remove('is-hidden');
    //     };

    //     // console.log(data);
    //     // console.log(resultArr);

    //     galleryContainer.innerHTML = createImageCard(resultArr);

    //     gallery.refresh();
        
    // })
    //    .catch(error => console.log(error))
    //    .finally(() => {
    //     inputForm.elements.searchBtn.disabled = false;
    // });
};


loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
async function onLoadMoreBtnClick(event) {
    event.target.disabled = true;
    jsonPixabayApi.page += 1;
    // console.log(jsonPixabayApi.page);

    try {
        const loadMoreData = await jsonPixabayApi.fetchRequest();
        
        galleryContainer.insertAdjacentHTML('beforeend', createImageCard(loadMoreData.hits));
        // console.log(jsonPixabayApi.page);

        gallery.refresh();

        // if (jsonPixabayApi.page*40 > loadMoreData.totalHits) {
        //     loadMoreBtn.classList.add('is-hidden');
        //     Notify.info("We're sorry, but you've reached the end of search results.");
        // };
        if (loadMoreData.hits.length === 0) {
            loadMoreBtn.classList.add('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
        
    }
    catch (error) {
        console.log(error);
    }
    finally {
        event.target.disabled = false;
    }

    // jsonPixabayApi.fetchRequest()
    //     .then(({data}) => {
    //         galleryContainer.insertAdjacentHTML('beforeend', createImageCard(data.hits));
    //         // console.log(jsonPixabayApi.page);

    //         gallery.refresh();

    //         if (jsonPixabayApi.page*40 > data.totalHits) {
    //             loadMoreBtn.classList.add('is-hidden');
    //             Notify.info("We're sorry, but you've reached the end of search results.");
    //         };
    //     })
    //     .catch(err => console.log(err))
    //     .finally(() => {
    //     event.target.disabled = false;
    // });
};
