const DataLoader = require("dataloader");

const UserService = require("./user");

function buildLoaderGetter() {
  const store = new WeakMap();
  return (loaderService) => {
    let loader = store.get(loaderService);
    if (!loader) {
      if (typeof loaderService.getManyByIds !== "function") {
        throw new Error(`Service ${loaderService} doesn't have a getManyByIds function.`);
      }
      loader = new DataLoader(loaderService.getManyByIds);
      store.set(loaderService, loader);
    }
    return loader;
  };
}

module.exports = {
  buildLoaderGetter,
};
