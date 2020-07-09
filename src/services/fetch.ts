export const url = "http://46.101.192.225:8008";

const saveToken = (token: string):void => {
  localStorage.setItem('cutie-py-token',token);
}


export const getTokenData =  (login: string,password: string):Promise<any> => {
  return fetch(`${url}/api/jwtauth/token/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: login,password})
  })
      .then(res => {
        if(res.status === 200) {
          return res.json();
        }else {
          return Promise.reject();
        }
      })
      .then(json => {
        saveToken(JSON.stringify(json));
        return Promise.resolve(json);
      })
}

export const refreshToken = (token:string):Promise<any> => {
  return fetch(`${url}/api/jwtauth/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh:token,
    }),
  })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        return Promise.reject();
      })
      .then(json => {
        let tokens = localStorage.getItem("cutie-py-token");
        if(tokens !== null) tokens = JSON.parse(tokens);
        // @ts-ignore
        tokens.expires_in = json.expires_in;
        // @ts-ignore
        tokens.access = json.access;
        saveToken(JSON.stringify(tokens));
        return tokens;
      })
}


export const fetchWithAuth = async (endpoint: string, options?: any):Promise<any> => {

  let tokenData;
  const token: string | null = localStorage.getItem('cutie-py-token');

  if(typeof token === 'string') {
    tokenData = JSON.parse(token);
  }

  if(!options.headers) {
    options.headers = {};
  }

  if(tokenData) {
    if(Date.now() >= tokenData.expires_in * 1000) {
      try {
        tokenData = await refreshToken(tokenData.refresh);
      }catch (e) {
        console.error(e);
      }
    }
    options.headers.Authorization = `Bearer ${tokenData.access}`
  }
  return fetch(`${url}/${endpoint}`,options);
}
