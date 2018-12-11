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
  getPets() {
      return fetch('/api/pets', getOptions('GET'))
        .then(response => response.json());      
  },
    
  addPet(pet) {
      return fetch('/api/pets', getOptions('POST', pet))
        .then(response => response.json());
  }
};