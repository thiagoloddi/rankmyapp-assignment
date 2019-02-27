export const handle = (controller) => {
  return  async (req, res) => {
    const { status, data } = await controller(req.params, req.body);

    if(status != 200) {
      console.error(data);
    }

    res.status(status).send(data);
  }
}