
export default class Events {
  constructor({ groupUrlname }) {
    this.groupUrlname = groupUrlname;
  }

  past({
    /* eslint-disable camelcase */
    stop_if_date_less_than = null,
    stop_if_date_greater_than = null,
    desc = false
    /* eslint-enable */
  } = {}) {
    return this.get({
      status: 'past',
      stop_if_date_less_than,
      stop_if_date_greater_than,
      desc
    });
  }

  // pastAscending({
  //   /* eslint-disable camelcase */
  //   stop_if_date_less_than = null, stop_if_date_greater_than = null
  //   /* eslint-enable */
  // } = {}) {
  //   return this.get({
  //     stop_if_date_less_than,
  //     stop_if_date_greater_than,
  //     status: 'past',
  //     desc: false
  //   });
  // }

  // pastDescending({
  //   /* eslint-disable camelcase */
  //   stop_if_date_less_than = null, stop_if_date_greater_than = null
  //   /* eslint-enable */
  // } = {}) {
  //   return this.get({
  //     stop_if_date_less_than,
  //     stop_if_date_greater_than,
  //     status: 'past',
  //     desc: true
  //   });
  // }

  request({
    stop_if_date_less_than,
    stop_if_date_greater_than,
    status,
    desc
  }) {
    // const url = new URL('http://localhost:4000');
    const url = new URL('https://phx-api.herokuapp.com');
    // const url = 'https://api.meetup.com/NullSpaceLabs/events?desc=true&' +
    //   'group_urlname=&page=200&sig_id=201611406&omit=description%2Chow_to_find_us&' +
    //   'status=past&sig=e6680c25b1b9b1e07cc5e9389a16160553ffc094';

    url.pathname = '/api/meetup_requests';

    const searchParams = new URLSearchParams();
    searchParams.append('status', status);

    return [
      url.toString(), {
        headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ meetup_request: {
          endpoint: `/${this.groupUrlname}/events`,
          query: searchParams.toString(),

          stop_if_date_less_than,
          stop_if_date_greater_than,
          desc
        }})
      }
    ];
  }

  get({
    stop_if_date_less_than,
    stop_if_date_greater_than,
    status,
    desc
  }) {
    return fetch(...this.request({
      stop_if_date_less_than, stop_if_date_greater_than, status, desc
    })).then((response) => {
      return response.json().then((json) => {
        return JSON.parse(json.data.data);
      });
    })
    .catch(err => console.error('fetch failed...', err));
  }
}
