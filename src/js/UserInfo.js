/* eslint-disable no-console */
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
      })
      .catch((err) => console.log(err));
  }

  setUserInfo() {
    this.name.value = this.infoName.textContent;
    this.job.value = this.infoJob.textContent;
  }

  updateUserInfo(popup) {
    this.api.sendUserUpdate(this.name.value, this.job.value)
      .then(() => {
        this.infoName.textContent = this.name.value;
        this.infoJob.textContent = this.job.value;

        popup.close();
      })
      .catch((err) => console.log(err));
  }
}
