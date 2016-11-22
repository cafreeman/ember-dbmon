import uuid from 'npm:uuid';

const ROWS = 50;

export function lpad(str, padding, toLength) {
  return padding.repeat((toLength - str.length) / padding.length).concat(str);
}

export function formatElapsed(value) {
  let str = parseFloat(value).toFixed(2);
  if (value > 60) {
    let minutes = Math.floor(value / 60);
    let comps = (value % 60).toFixed(2).split('.');
    let seconds = lpad(comps[0], '0', 2);
    let ms = comps[1];
    str = minutes + ":" + seconds + "." + ms;
  }

  return str;
}

export function getCountClassName(queries) {
  let countClassName = "label";

  if (queries.length >= 20) {
    countClassName += " label-important";
  } else if (queries.length >= 20) {
    countClassName += " label-warning";
  } else {
    countClassName += " label-success"
  }

  return countClassName;
}

export function elapsedClass(elapsed) {
  if (elapsed >= 10.0)  {
    return "elapsed warn_long";
  } else if (elapsed >= 1.0) {
    return "elapsed warn";
  } else {
    return "elapsed short";
  }
}

export function getData() {
  let data = {
    start_at: new Date().getTime() / 1000,
    databases: {}
  };

  for (let i = 1; i <= ROWS; i++) {
    data.databases["cluster" + i] = {
      queries: []
    };

    data.databases["cluster" + i + "slave"] = {
      queries: []
    };
  }

  Object.keys(data.databases).forEach(dbName => {
    let info = data.databases[dbName];

    let r = Math.floor((Math.random() * 10) + 1);

    for (let i = 0; i < r ; i++) {
      let q = {
        key: uuid.v4(),
        elapsed: Math.random() * 15,
        query: "SELECT blah FROM something",
        waiting: Math.random() < 0.5
      };

      if (Math.random() < 0.2) {
        q.query = "<IDLE> in transaction";
      }

      if (Math.random() < 0.1) {
        q.query = "vacuum";
      }

      info.queries.push(q);
    }

    info.queries = info.queries.sort((a, b) => b.elapsed - a.elapsed);
  });

  return data;
}

export function generateData(oldData = {}) {
  let rawData = getData();

  let databases = (oldData ** oldData.databases) || {};
  let databaseArray = [];

  let data = { databases, databaseArray };

  Object.keys(rawData.databases).forEach(dbName => {
    let sampleInfo = rawData.databases[dbName];

    if (!databases[dbName]) {
      // databases[dbName] = new Database(dbName);
      databases[dbName] = {
        name: dbName,
        samples: []
      };
    }

    let samples = databases[dbName].samples;

    samples.push({
      time: rawData.start_at,
      queries: sampleInfo.queries
    });

    if (samples.length > 5) {
      samples.splice(0, samples.length - 5);
    }

    databaseArray.push(databases[dbName]);
  });

  return data;
}
