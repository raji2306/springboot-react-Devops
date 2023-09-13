package com.devops.devopsproj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devops.devopsproj.exception.UserNotFoundException;
import com.devops.devopsproj.model.User;
import com.devops.devopsproj.repository.UserRepository;

@RestController
//@CrossOrigin("http://localhost:3000")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
    @Value("${cors.origin}")
    private String corsOrigin;
	
	@CrossOrigin(origins = "${cors.origin}")
	@PostMapping(value = "/user", consumes = {"application/json"})
	User newUser(@RequestBody User newUser) {
		return userRepository.save(newUser);
	}
	
	@CrossOrigin(origins = "${cors.origin}")
	@GetMapping("/user-data")
		List<User> getAllUsers(){
			return userRepository.findAll();
	}
	
	@CrossOrigin(origins = "${cors.origin}")
	@GetMapping("/user/{id}")
	User getUserById(@PathVariable Long id) {
		return userRepository.findById(id)
				.orElseThrow(()-> new UserNotFoundException(id));
	}
	
	@CrossOrigin(origins = "${cors.origin}")	
	@PutMapping("/user/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Long id) {
		return userRepository.findById(id).map(user->
		{
			user.setUsername(newUser.getUsername());
			user.setName(newUser.getName());
			user.setEmail(newUser.getEmail());
			return userRepository.save(user);
		}).orElseThrow(()->new UserNotFoundException(id));
	}

	@CrossOrigin(origins = "${cors.origin}")
	@DeleteMapping("/user/{id}")
	String deleteUser(@PathVariable Long id) {
		if(!userRepository.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		userRepository.deleteById(id);
		return "User deleted successfully Buddy " + id ;
	}
}