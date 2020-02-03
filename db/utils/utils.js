exports.formatDates = list => {
  const copyList = list.map(obj => {
    let newObj = { ...obj };

    const timeStamp = newObj.created_at;

    newObj.created_at = new Date(timeStamp);

    return newObj;
  });

  return copyList;
};

exports.makeRefObj = (list, key, value) => {
  const refObj = list.reduce((obj, item) => {
    obj[item[key]] = item[value];
    return obj;
  }, {});
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const copyComments = comments.map(item => {
    let newItem = { ...item };
    newItem.author = newItem.created_by;
    newItem.article_id = articleRef[item.belongs_to];
    delete newItem.belongs_to;
    delete newItem.created_by;
    newItem.created_at = new Date(newItem.created_at);

    return newItem;
  });
  return copyComments;
};
