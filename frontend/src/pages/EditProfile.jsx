import React, { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext.js";
import FormError from "../components/FormError.jsx";
import FormSuccess from "../components/FormSuccess.jsx";

function EditProfile() {
    const { user } = useContext(AuthContext);

    const fileInputRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(user?.profilePic || null);
    const [photoError, setPhotoError] = useState("");

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    // -----------------------------
    // Profile Image
    // -----------------------------

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadImage = async () => {
        if (!selectedImage) return;

        // API call will go here
        console.log("Uploading:", selectedImage);
    };

    // -----------------------------
    // Password
    // -----------------------------

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        setPasswords((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        console.log("Hello");

        setPasswordError("");
        setPasswordSuccess("");

        try{
            if(passwords.newPassword != passwords.confirmPassword){
                setPasswordError("Passwords do not match");
                return;
            }
            const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/user/change-password`;
            const options = {
                // 1. Specify the HTTP method
                method: "PUT",

                // 2. Define content types and authentication
                headers: {
                    "Content-Type": "application/json",
                },

                // 3. for cookies
                credentials: "include",

                // 4. Serialize your JavaScript object into a JSON string
                body: JSON.stringify({
                    currentPassword : passwords.currentPassword,
                    newPassword : passwords.newPassword
                }),
            };

            debugger;
            const response = await fetch(api, options);
            debugger;
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }
            debugger;
            setPasswordSuccess(data.message);
        }
        catch(err){
            debugger;
            setPasswordError(err.message);
        }
    };

    return (
        <main className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-slate-950 px-5 py-12 text-white">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
                        backgroundSize: "70px 70px",
                    }}
                />

                <div className="absolute left-1/4 top-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

                <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[130px]" />
            </div>

            <div className="relative mx-auto max-w-4xl">
                {/* Heading */}
                <div className="mb-10 animate-[fadeIn_0.6s_ease-out]">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
                        Account Settings
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Edit Profile
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Manage your profile photo and account security.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* ========================================= */}
                    {/* PROFILE PHOTO */}
                    {/* ========================================= */}

                    <section
                        className="rounded-3xl border border-white/10
            bg-slate-900/60 p-6 shadow-2xl shadow-black/20
            backdrop-blur-xl transition-all duration-500
            hover:border-violet-500/20 sm:p-8"
                    >
                        <div className="mb-7">
                            <h2 className="text-xl font-semibold">
                                Profile Photo
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Update the photo displayed on your QuizAI
                                account.
                            </p>
                        </div>

                        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                            {/* Profile Image */}
                            <div className="group relative mx-auto sm:mx-0">
                                <div
                                    className="absolute -inset-1 rounded-full
                  bg-gradient-to-r from-violet-600 to-purple-400
                  opacity-40 blur transition duration-500
                  group-hover:opacity-80"
                                />

                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="relative h-28 w-28 rounded-full
                    border-4 border-slate-900 object-cover
                    transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div
                                        className="relative flex h-28 w-28 items-center
                    justify-center rounded-full border-4 border-slate-900
                    bg-gradient-to-br from-violet-600 to-purple-700
                    text-4xl font-bold"
                                    >
                                        {user?.name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>

                            {/* Photo Controls */}
                            <div className="flex-1">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="rounded-xl bg-violet-600 px-5 py-2.5
                    text-sm font-semibold text-white
                    shadow-lg shadow-violet-500/20
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-violet-500
                    hover:shadow-violet-500/30"
                                    >
                                        Choose Photo
                                    </button>

                                    {selectedImage && (
                                        <button
                                            type="button"
                                            onClick={handleUploadImage}
                                            className="rounded-xl border border-violet-500/30
                      bg-violet-500/10 px-5 py-2.5
                      text-sm font-medium text-violet-300
                      transition-all duration-300
                      hover:bg-violet-500/20"
                                        >
                                            Save Photo
                                        </button>
                                    )}

                                    {preview && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="rounded-xl border border-white/10
                      bg-white/[0.03] px-5 py-2.5
                      text-sm font-medium text-slate-300
                      transition-all duration-300
                      hover:border-red-500/30
                      hover:bg-red-500/10
                      hover:text-red-400"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <p className="mt-4 text-xs text-slate-500">
                                    JPG or PNG. Maximum file size 5MB.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ========================================= */}
                    {/* ACCOUNT INFORMATION */}
                    {/* ========================================= */}

                    <section
                        className="rounded-3xl border border-white/10
            bg-slate-900/60 p-6 backdrop-blur-xl
            transition-all duration-500
            hover:border-violet-500/20 sm:p-8"
                    >
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                Account Information
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Basic information associated with your account.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">
                                    Name
                                </label>

                                <div
                                    className="rounded-xl border border-white/10
                  bg-slate-950/50 px-4 py-3 text-sm text-slate-300"
                                >
                                    {user?.name}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">
                                    Email
                                </label>

                                <div
                                    className="truncate rounded-xl border border-white/10
                  bg-slate-950/50 px-4 py-3 text-sm text-slate-300"
                                >
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ========================================= */}
                    {/* PASSWORD */}
                    {/* ========================================= */}

                    <section
                        className="rounded-3xl border border-white/10
            bg-slate-900/60 p-6 backdrop-blur-xl
            transition-all duration-500
            hover:border-violet-500/20 sm:p-8"
                    >
                        <div className="mb-7">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 items-center justify-center
                  rounded-xl border border-violet-500/20
                  bg-violet-500/10 text-lg"
                                >
                                    🔒
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Password & Security
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Update your password to keep your
                                        account secure.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-5"
                        >
                            {/* Current Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Current Password
                                </label>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="currentPassword"
                                    value={passwords.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    className="w-full rounded-xl border border-white/10
                  bg-slate-950/60 px-4 py-3
                  text-sm text-white outline-none
                  transition-all duration-300
                  placeholder:text-slate-600
                  focus:border-violet-500/60
                  focus:ring-4 focus:ring-violet-500/10"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {/* New Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        New Password
                                    </label>

                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                        className="w-full rounded-xl border border-white/10
                    bg-slate-950/60 px-4 py-3
                    text-sm text-white outline-none
                    transition-all duration-300
                    placeholder:text-slate-600
                    focus:border-violet-500/60
                    focus:ring-4 focus:ring-violet-500/10"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Confirm Password
                                    </label>

                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                        className="w-full rounded-xl border border-white/10
                    bg-slate-950/60 px-4 py-3
                    text-sm text-white outline-none
                    transition-all duration-300
                    placeholder:text-slate-600
                    focus:border-violet-500/60
                    focus:ring-4 focus:ring-violet-500/10"
                                    />
                                </div>
                            </div>

                            {/* Show Password */}
                            <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-slate-400">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={(e) =>
                                        setShowPassword(e.target.checked)
                                    }
                                    className="h-4 w-4 accent-violet-600"
                                />
                                Show passwords
                            </label>

                            {/* Password Error */}
                            {passwordError && <FormError error = {passwordError}></FormError>}

                            {/* Password success */}
                            {passwordSuccess && <FormSuccess success={passwordSuccess}></FormSuccess>}

                            {/* Bottom */}
                            <div
                                className="flex flex-col gap-4 border-t
                border-white/10 pt-6 sm:flex-row
                sm:items-center sm:justify-between"
                            >
                                <p className="text-xs text-slate-500">
                                    Use at least 8 characters for your password.
                                </p>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-violet-600
                  px-6 py-3 text-sm font-semibold text-white
                  shadow-lg shadow-violet-500/20
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-violet-500
                  hover:shadow-violet-500/30
                  active:translate-y-0"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default EditProfile;
