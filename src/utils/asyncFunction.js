const catchAsync = (fn) =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    // console.log(Promise.resolve(fnReturn).catch(next));
    return Promise.resolve(fnReturn).catch(next);
  };

module.exports = catchAsync;
