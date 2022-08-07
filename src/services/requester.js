const request = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}');

        let headers = {}

        if (auth.token) {
            headers['X-Authorization'] = auth.token;
        }

        let buildRequest;

        if (method === 'GET') {
            buildRequest = fetch(url, { headers });
            // buildRequest = fetch(url);
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        
        const response = await buildRequest;
        const result = await response.json();
        
        if (response.ok) {
            return result;
        } else {
            throw result;
        }

    } catch(error) {
        throw error;
    }
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');