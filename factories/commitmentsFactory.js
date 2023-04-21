class CommitmentsFactory {
  Build(simpleCommitments) {
    let day = simpleCommitments.date.getDate() + 1;
    let month = simpleCommitments.date.getMonth();
    let year = simpleCommitments.date.getFullYear();

    let hour = Number.parseInt(simpleCommitments.time.split(":")[0]);
    let minute = Number.parseInt(simpleCommitments.time.split(":")[1]);

    let startDate = new Date(year, month, day, hour, minute, 0, 0);

    let comms = {
      id: simpleCommitments._id,
      title: simpleCommitments.title + " - " + simpleCommitments.description,
      start: startDate,
      end: startDate,
    };

    console.log(comms);
    return comms;
  }
}

module.exports = new CommitmentsFactory();
