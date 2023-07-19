
const form = document.querySelector('form')!;
const input = document.querySelector('#address')! as HTMLInputElement;
form.addEventListener('submit',searchHandler);

function searchHandler(event:Event){
    event?.preventDefault();
    // console.log(input.value);
  if(input.value.trim().length < 4){
    alert('please search for valid movie');
  }else{
    new SearchData(input.value);
  }
//  new FetchData();
   
      
}

class SearchData{
    constructor(title:string){
        const searchTerm = title;

            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJlZjA2OWJkOWJmYzYzMDgzNDhiNjhhOGVhMWVhNyIsInN1YiI6IjY0YjcyODY1MTA5Y2QwMDEwMTgzNmNiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r66VuU4Lk0_857IGTLQANVnH5y3G-rHTouGva6C1aA8'
            }
            };

            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}`, options)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
                
            })
            .then(response => {
                if(response.results.length === 0){
                    alert('not found');
                  
                }else{
                      new DisplayData(response.results);
                }
            })
            .catch(err => alert(err));

    }
}

class FetchData{

    public fetchedData:any;


    constructor(){
         const fetchData = async() => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJlZjA2OWJkOWJmYzYzMDgzNDhiNjhhOGVhMWVhNyIsInN1YiI6IjY0YjcyODY1MTA5Y2QwMDEwMTgzNmNiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r66VuU4Lk0_857IGTLQANVnH5y3G-rHTouGva6C1aA8'
                }
              };
        
              try {
                const response = await fetch('https://api.themoviedb.org/3/search/movie', options);
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                // console.log(responseData.results.slice(0,5));
                this.fetchedData = responseData.results.slice(0,5);
                if (this.fetchedData) {
                    new DisplayData(this.fetchedData);
                  }
              } catch (err) {
                console.error(err);
              }
              
      }
      
      fetchData();

    
    }
}


class DisplayData<T extends Array<any> | Iterable<any>> {
    constructor(private data: T) {
        
        this.display();
    }
  
    display(): void {

        const  movies = document.querySelector('.row')! as HTMLDivElement;
        for (const item of this.data) {
            const single_movie = document.createElement('div');
            single_movie.classList.add('col-sm');
            single_movie.classList.add('mt-4');
      
            const poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      
            const image = document.createElement('img');
            image.src = poster_path;
            image.alt = item.title;
            image.addEventListener('click', () => this.handleDetails(item));
      
            const title = document.createElement('p');
            title.textContent = item.title;
      
            single_movie.appendChild(image);
            single_movie.appendChild(title);
      
            movies.appendChild(single_movie);
          }
 
         

    }

    handleDetails(movie:any){

        const movieTitle = document.getElementById('movieTitle') as HTMLDivElement;
        const moviePoster = document.getElementById('moviePoster') as HTMLImageElement;
        const details = document.getElementById('details') as HTMLImageElement;
        const lang = document.getElementById('lang') as HTMLImageElement;

        movieTitle.textContent = movie.title;
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        details.textContent= movie.overview;
        lang.textContent ='language: ' +movie.original_language;
        // $('#myModal').on('shown.bs.modal', function () {
        // $('#myInput').trigger('focus')
        // })
        $('#exampleModal').modal('show'); // Show the Bootstrap modal

    }
  }



//   class SingleM{
//     constructor(){
//         const fetchData = async() => {
//             const options = {
//                 method: 'GET',
//                 headers: {
//                   accept: 'application/json',
//                   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGJlZjA2OWJkOWJmYzYzMDgzNDhiNjhhOGVhMWVhNyIsInN1YiI6IjY0YjcyODY1MTA5Y2QwMDEwMTgzNmNiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r66VuU4Lk0_857IGTLQANVnH5y3G-rHTouGva6C1aA8'
//                 }
//               };
        
//               try {
//                 const response = await fetch('https://api.themoviedb.org/3/movie/667538-transformers-rise-of-the-beasts', options);
//                 if (!response.ok) {
//                   throw new Error('Network response was not ok');
//                 }
//                 const responseData = await response.json();
//                 // console.log(responseData);
//                 // this.fetchedData = responseData.results.slice(0,5);
//                 // if (this.fetchedData) {
//                 //     new DisplayData(this.fetchedData);
//                 //   }
//               } catch (err) {
//                 console.error(err);
//               }
              
//       }
      
//       fetchData();
//     }
//   }

//   const singleMo = new SingleM();




