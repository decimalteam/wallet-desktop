/* eslint-disable func-names */
Element.prototype.scrollIntoViewPromise = function (options) {
  this.scrollIntoView(options);

  const parent = this;

  return {
    then(x) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setTimeout(() => { x(); intersectionObserver.unobserve(parent); }, 200);
        }
      });

      intersectionObserver.observe(parent);
    },
  };
};
