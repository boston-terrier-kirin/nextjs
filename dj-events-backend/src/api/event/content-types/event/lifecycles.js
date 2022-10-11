const slugify = require("slugify");

// https://dev.to/elchiconube/create-a-slug-system-with-strapi-v4-1abm
module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    if (data.name) {
      data.slug = slugify(data.name, { lower: true });
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.name) {
      data.slug = slugify(data.name, { lower: true });
    }
  },
};
