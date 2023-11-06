const success = (res, payload) => {
  return res.status(200).send({ payload });
};

const ServerError = (res, error) => {
  return res.status(500).send({ error });
};

const ClientError = (res, error) => {
  return res.status(400).send({ error });
};

export default {
  success,
  ServerError,
  ClientError,
};
