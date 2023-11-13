"use client";

import useAuth from '@/store/auth'
import React from 'react'

const Protected = () => {
  const {isAuthenticated} = useAuth();
}

export default Protected