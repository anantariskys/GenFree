import { Form, useActionData, useNavigation } from '@remix-run/react'
import React, { useEffect, useRef } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useToast } from '../ToastProvider';

type Props = { user: {
    user:{
        gender:number
        name:string
        display_name:string
    },
    userProfile:{
        user:{
            email:string
        }
    }
} };
const FormProfile:React.FC<Props> = ({user}) => {
  const actionData = useActionData<{ error?: string; success?: string }>();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.error) {
      showToast(actionData.error, "error");
    }
    if (actionData?.success) {
      showToast(actionData.success, "success");
    }
  }, [actionData, showToast]);

  useEffect(() => {
    if (!isSubmitting && formRef.current) {
      formRef.current.reset();
    }
  }, [isSubmitting]);
  return (
    <Form ref={formRef} method="post" className="grid grid-cols-2 gap-4 ">
    <Input
      id="nama"
      label="Nama"
      placeholder="Alif Nur Sanubari"
      value={user.user.name}
      name="nama"
    />
    <Input
      id="display_name"
      label="Nama Tampilan"
      placeholder="Mohon isi nama tampilan"
      value={user.user.display_name}
      name="display_name"
    />
    <Input
      disabled
      id="email"
      label="Email"
      value={user.userProfile.user.email}
      placeholder="Mohon isi email"
      name="email"
    />
    <div className="flex items-end">
      <Button width="w-fit" disabled={isSubmitting}>{isSubmitting?"Menyimpan...":"Simpan"}</Button>
    </div>
  </Form>
  )
}

export default FormProfile
