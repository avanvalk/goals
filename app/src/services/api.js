let token = '';

const getOptions = (method, data) => {
  const options = {
    method,
    headers: {}
  };

  if(data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  if(token) {
    options.headers.Authorization = token;
  }

  return options;
};

export default {
  
  setToken(t) {
    token = t;
  },

  signUp(profile) {
    return fetch('/api/auth/signup', getOptions('POST', profile))
      .then(response => {
        if(response.ok) {
          return response.json();
        }

        return response.json()
          .then(error => {
            return Promise.reject(error);
          });
      });
  },

  signIn(credentials) {
    return fetch('/api/auth/signin', getOptions('POST', credentials))
      .then(response => {
        if(response.ok) {
          return response.json();
        }

        return response.json()
          .then(error => {
            return Promise.reject(error);
          });
      });
    },
    
  getDogs() {
      return fetch('/api/dogs', getOptions('GET'))
        .then(response => response.json());      
  },

  addDog(dog) {
      return fetch('/api/dogs', getOptions('POST', dog))
        .then(response => response.json());
  }
};