/* eslint-disable no-console */
export default class UserInfo {
  constructor(name, job, infoName, infoJob, api, photo) {
    this.infoName = infoName;
    this.infoJob = infoJob;
    this.name = name;
    this.job = job;
    this.api = api;
    this.photo = photo;
    this.defaultData = this.defaultData.bind(this);
  }

  defaultData() {
    this.api.getUserInfo()
      .then((user) => {
        this.infoName.textContent = user.name;
        this.infoJob.textContent = user.about;
        this.photo.setAttribute('style', `background-image:url('${user.avatar}')`);
      })
      .catch((err) => console.log(err));
  }

  setUserInfo() {
    this.name.value = this.infoName.textContent;
    this.job.value = this.infoJob.textContent;
  }

  updateUserInfo(popup, submitEdit) {
    const submit = submitEdit;
    submit.textContent = 'Загрузка...';
    this.api.sendUserUpdate(this.name.value, this.job.value)
      .then(() => {
        this.infoName.textContent = this.name.value;
        this.infoJob.textContent = this.job.value;
        submit.textContent = 'Сохранить';
        popup.close();
      })
      .catch((err) => console.log(err));
  }

  updateUserAvatar(popup, link) {
    this.api.sendAvatarUpdate(link)
      .then((res) => {
        this.photo.setAttribute('style', `background-image:url('${res.avatar}')`);

        popup.close();
      })
      .catch((err) => console.log(err));
  }
}
