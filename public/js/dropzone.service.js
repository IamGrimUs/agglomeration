import Dropzone from 'dropzone';
import Cookies from 'js-cookie';

// "myAwesomeDropzone" is the camelized version of the HTML element's ID
export function setupDropZone(userId) {
  Dropzone.options.myAwesomeDropzone = {
    paramName: 'file', // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    },
    accept: function(file, done) {
      if (file.name == 'justinbieber.jpg') {
        done("Naha, you don't.");
      } else {
        console.log('success the image is up');
        done();
      }
    },
    acceptedFiles: 'image/*',
    url: `/users/${userId}/photo`,
    error: function() {
      console.log('there was an error');
    }
  };
}
