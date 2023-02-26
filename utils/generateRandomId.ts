function generateRandomId(): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    const id = `${timestamp}-${random}`;
    return id;
}

export default generateRandomId;
  