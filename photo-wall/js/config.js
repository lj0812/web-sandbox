const API_CONFIG = {
    unsplash: {
        endpoint: 'https://api.unsplash.com/photos/random',
        params: {
            client_id: 'bag1Hg5n_Q4lO5TyA37zq_h_C0IH8fj9Z2i7mYpEJqU',
            orientation: 'landscape'
        }
    },
    pexels: {
        endpoint: 'https://api.pexels.com/v1/curated',
        headers: {
            Authorization: 'NfDRR4mNpfWKMs3FwArf2oBCv5cEn3PnxwsHpBCCUW8jLxl3bNKCtSN8'
        }
    },
    openverse: {
        endpoint: 'https://api.openverse.engineering/v1/images',
        params: {
            license_type: 'commercial,modification',
            size: 'large'
        }
    }
};