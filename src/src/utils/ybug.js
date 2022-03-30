const setUserDetail = (user) => {
  console.log(user);

  window.ybug_settings.feedback = {
    email: user.email,
    name: user.displayName
  };
  window.ybug_settings.user = {
    ...user
  };
};

const reset = () => {
  window.ybug_settings.feedback = {};
  window.ybug_settings.user = {};
};

export { setUserDetail, reset };
