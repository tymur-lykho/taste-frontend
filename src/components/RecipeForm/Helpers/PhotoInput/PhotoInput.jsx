import { useFormikContext } from "formik";
import Icon from "../../../../reuseable/Icon/Icon";
import styles from "./PhotoInput.module.css";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";

export default function PhotoInput({ name }) {
  const { setFieldValue } = useFormikContext();
  // const [field, meta] = useField(name);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // const formData = new FormData();

      const file = acceptedFiles[0];
      // formData.append("file", file);
      if (file) {
        console.log(file);

        setFieldValue(name, file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [setFieldValue, name]
  );

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div>
      <h2 className={styles["uploadphoto-title"]}>Upload Photo</h2>
      <div className={styles["photo-upload"]} {...getRootProps()}>
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log(file); // має бути File
              setFieldValue("photo", file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        /> */}
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", height: "100%", borderRadius: "16px" }}
          />
        ) : (
          <Icon className={styles.icon} iconName={"icon-photo2"} />
        )}
      </div>
    </div>
  );
}
