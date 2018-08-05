export function StatusService() {
  const that = this;

  let svc = {
    store: {}
  };

  svc.add = function(id, status, fadeout = false) {
    svc.store[id] = { text: status };
    that.setState({ statuses: svc.store });

    if (fadeout) {
      this.delete(id, fadeout);
    }
  };

  svc.edit = function(id, status, fadeout = false) {
    svc.store[id] = { text: status, fadeout: true };
    that.setState({ statuses: svc.store });

    if (fadeout) {
      this.delete(id, fadeout);
    }
  };

  svc.delete = (id, fadeout = false) => {
    const setNewState = () => {
      delete svc.store[id];
      that.setState({ statuses: svc.store });
    };

    if (fadeout) {
      setTimeout(function() {
        setNewState();
      }, 5000);
    } else {
      setNewState();
    }
  };

  return svc;
}
