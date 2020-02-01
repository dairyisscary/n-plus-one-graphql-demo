const chalk = require("chalk");

const DEFAULT_SLEEP_MS = 150;

module.exports = {
  sleepSync(time = DEFAULT_SLEEP_MS) {
    const start = new Date().getTime();
    const expire = start + time;
    while (new Date().getTime() < expire) { }
  },
  sleep(time = DEFAULT_SLEEP_MS) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },
  profileServiceCall(entityDesc, resolverFn) {
    return (...args) => {
      const startTime = new Date().getTime();
      console.log(chalk.blue(`-- Service: Starting ${entityDesc}...`));
      const resolverValue = resolverFn(...args);
      if (resolverValue.then) { // assume this is a promise
        return resolverValue.then((realValue) => {
          const doneTime = new Date().getTime();
          console.log(chalk.green(`-- Service: Finished ${entityDesc}. Took ${doneTime - startTime} ms.`));
          return realValue;
        });
      }
      const doneTime = new Date().getTime();
      console.log(chalk.green(`-- Service: Finished ${entityDesc}. Took ${doneTime - startTime} ms.`));
      return resolverValue;
    };
  },
  profileResolver(entityDesc, resolverFn) {
    return (...args) => {
      console.log(chalk.blue(`\n- Resolver: Starting ${entityDesc}...`));
      const resolverValue = resolverFn(...args);
      if (resolverValue.then) { // assume this is a promise
        return resolverValue.then((realValue) => {
          console.log(chalk.green(`- Resolver: Finished ${entityDesc}.`));
          return realValue;
        });
      }
      console.log(chalk.green(`- Resolver: Finished ${entityDesc}.`));
      return resolverValue;
    };
  }

};
