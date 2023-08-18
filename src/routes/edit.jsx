import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contact";

export async function action({ request, params }) {
  const formData = await request.formData();
  //   formData.get("first"); // first is the name of the input field
  //   formData.get("second"); // first is the name of the input field
  const updates = Object.fromEntries(formData); // collect all the form field values into an object
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function Edit() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  const { first, second, twitter, avatar } = contact;

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First Name"
          aria-label="First Name"
          type="text"
          name="first"
          defaultValue={first}
        />
        <input
          placeholder="Second Name"
          aria-label="Second Name"
          type="text"
          name="last"
          defaultValue={second}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          type="text"
          aria-label="Avatar URL"
          name="avatar"
          defaultValue={avatar}
          placeholder="https://example.com/avatar.jpg"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
