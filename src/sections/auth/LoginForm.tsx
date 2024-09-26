import React, { useState } from "react";
import { Form, Spin, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { ButtonCustom } from "@/components/ui/button";
import { InputCustom } from "@/components/ui/input";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { notify } from "@/components/Notification";
import { login } from "@/apis/authApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Roles } from "@/enums";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuthStore";

const provider = new GoogleAuthProvider();

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      });
      if (res && res.status === 200) {
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("refreshToken", res.data.refreshToken);
        const jwtToken = Cookies.get("accessToken");
        if (jwtToken) {
          const decoded: any = jwtDecode(jwtToken);
          const role =
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          if (role !== Roles.ADMIN && role !== Roles.STORE) {
            notify("success", "Bạn không có quyền truy cập và trang này", 3);
            setIsLoading(false);
            return;
          } else {
            notify("success", "Đăng nhập thành công", 3);
            const authStore = useAuthStore.getState();
            authStore.login();
          }
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      notify("error", `${err.response.data.message}`, 3);
      return;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error("Error login with google", error);
    }
  };

  return (
    <>
      <section className="mx-5 my-2 flex min-h-[500px] min-w-[300px] max-w-[400px] flex-1 flex-col  justify-center overflow-hidden rounded-xl border-none bg-white p-6 shadow-xl transition-all duration-500 sm:min-w-[420px] sm:max-w-[500px] sm:border lg:p-10">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="mb-7 "
        >
          <h1 className="text-left text-xl font-bold text-primary transition-all duration-500 sm:text-2xl">
            Đăng nhập vào Fricks
          </h1>
        </motion.div>
        <motion.div className="flex justify-between gap-7">
          <ButtonCustom
            onClick={handleGoogleSignIn}
            className="w-full rounded-[5px] border-[0.5px] border-gray-200 !bg-white py-6 shadow-none hover:!bg-slate-200"
          >
            <FaGoogle color="red" />
          </ButtonCustom>
          <ButtonCustom
            onClick={() => notify("info", "Chức năng sẽ sớm cập nhật", 3)}
            className="w-full rounded-[5px] border-[0.5px] border-gray-200 !bg-white py-6 shadow-none hover:!bg-slate-200"
          >
            <FaFacebookF color="#1877f2" />
          </ButtonCustom>
          <ButtonCustom
            onClick={() => notify("info", "Chức năng sẽ sớm cập nhật", 3)}
            className="roundelgsm w-full rounded-[5px] border-[0.5px] border-gray-200 !bg-white py-6 shadow-none hover:!bg-slate-200"
          >
            <FaTwitter color="#1c9cea" />
          </ButtonCustom>
        </motion.div>
        <Divider>
          <span className="text-sm font-medium text-black/20 transition-all duration-500 lg:text-[16px]">
            hoặc
          </span>
        </Divider>
        <Form
          name="normal_login"
          className="login-form"
          form={form}
          onFinish={onFinish}
        >
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-9"
          >
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập đúng kiểu email",
                },
              ]}
              colon={true}
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <InputCustom
                placeholder="Email"
                type="email"
                className="!py-6 hover:border-primary focus:border-primary"
                autoFocus
              />
            </Form.Item>
          </motion.div>
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
                {
                  min: 4,
                  max: 20,
                  message: "Mật khẩu phải có ít nhất 8 kí tự",
                },
              ]}
              labelCol={{ span: 24 }}
              className="formItem"
              hasFeedback
            >
              <InputCustom
                placeholder="Mật khẩu"
                type="password"
                className="!py-6 hover:border-primary focus:border-primary"
              />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          >
            <Form.Item noStyle>
              <ButtonCustom
                // htmlType="submit"
                className="mx-auto mt-11 flex h-11 w-full items-center justify-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80"
              >
                {isLoading ? (
                  <Spin
                    indicator={<LoadingOutlined className="text-[#fff]" />}
                  />
                ) : (
                  "Đăng nhập"
                )}
              </ButtonCustom>
            </Form.Item>
          </motion.div>
        </Form>
      </section>
    </>
  );
};

export default LoginForm;
