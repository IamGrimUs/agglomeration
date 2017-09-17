import Dropzone from 'dropzone';
import Cookies from 'js-cookie';

// "myAwesomeDropzone" is the camelized version of the HTML element's ID
export function setupDropZone(userId) {
  Dropzone.options.profileImageDz = {
    paramName: 'profileImage',
    maxFilesize: 1,
    resizeWidth: 400,
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt')}`
    },
    accept: function (file, done) {
      if (file.name == 'justinbieber.jpg') {
        done("Naha, you don't.");
      } else {
        console.log('success the image is up');
        done();
      }
    },
    acceptedFiles: 'image/*',
    url: `/user/${userId}/photo`,
    error: function () {
      console.log('there was an error');
    }
  };
}
