import 'dotenv/config';

export default {
  expo: {
    name: "HerGuardian",
    slug: "herGuardian",
    extra: {
      API_KEY: process.env.API_KEY,
    },
  },
};
