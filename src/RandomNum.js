const randomNum = () => {
  return new Promise(resolve => setTimeout(() => resolve(Math.random()), 5000));
};

const wrapPromise = promise => {
  let status = "pending";
  let result = "";
  let suspense = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspense;
      } else if (status === "error") {
        throw result;
      }
      return result;
    }
  };
};

const createResource = () => {
  return {
    num: wrapPromise(randomNum())
  };
};

export default createResource;
