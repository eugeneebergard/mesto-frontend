
export default class UserInfo {
  constructor(name, job, infoName, infoJob, api) {
    this.infoName = infoName;
    this.infoJob = infoJob;
    this.name = name;
    this.job = job;
    this.api = api;
    this.defaultData = this.defaultData.bind(this);
  }

  defaultData() {
    this.api.getUserInfo()
      .then((user) => {
        this.infoName.textContent = user.name;
        this.infoJob.textContent = user.about;
      });
  }

  setUserInfo() {
    this.name.value = this.infoName.textContent;
    this.job.value = this.infoJob.textContent;
  }

  updateUserInfo() {
    this.infoName.textContent = this.name.value;
    this.infoJob.textContent = this.job.value;

    this.api.sendUserUpdate(this.name.value, this.job.value);
  }
}
