import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImageToFirebase(file: File, folder: string, baseName: string) {
  const storage = getStorage();
  const uniqueName = `${baseName}-${uuidv4()}.${file.name.split('.').pop()}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}