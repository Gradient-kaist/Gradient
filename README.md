# Gradient
Gradient is the machine learning assistance framework that helps developers to monitor the GPU usage and the progress of the trainings in models.

![alt tag](https://cloud.githubusercontent.com/assets/14136146/21643493/ec884d5c-d2cb-11e6-9ca7-1f0ecf254413.png)

## Key Features
* Monitor the GPU usage by reporting general GPU usage statistics when the user runs the machine learning program.
* Check the progress of the model training by watching on the iteration procedure of the training and changes in the variables.
* Alarm the error situations like gradient explosion or memory lack error  by giving push-notification to the developer.

## Getting Started
Generally, there are 3 components in this project

* A **nodejs web server** which will host the website
* A **MongoDB server** which will store the data 
(normally, nodejs webserver and MongoDB server would run on same machine, however, you can also configure with different settings)
*  **Clients**  (GPU servers) which will send *GPU data* and *learning progress data*.

![alt tag](https://cloud.githubusercontent.com/assets/14136146/21645024/c3115b1e-d2d3-11e6-9e07-6b17136cfe22.png)

## Installation
For the following guide, I will assume that all *web server*, *MongoDB server* and *GPU server* will run on the same machine. (However, you can still configure differently)

### Client API installation (to use progress API)
Setup your virtualenv (or global, if you wish)

(This guide assumes that MongoDB is installed in localhost)
```sh
$ pip install pymongo
$ python setup.py install
```


### Client GPU collector setup
Assume pymongo is installed and MongoDB is installed in localhost
```sh
$ cd gpu_monitor_nvidia/
$ python gpu_status_collector.py
```


### Web server setup
#### Install
```sh
$ cd gradient
$ npm install -d
```
#### Run
```sh
gulp dev
```




### Progress API Usage
#### All you need to do
`import gradient`

`gradient.registerProgress("DeepMNIST")` (parameters : *name*)

`gradient.updateProgress("DeepMNIST", i, 20000)` (parameters : *name*, *current_iteration*, *maximum_iteration*)
#### Example Usage
```python
import gradient
sess.run(tf.global_variables_initializer())
gradient.registerProgress("DeepMNIST")
for i in range(20000):
    batch = mnist.train.next_batch(50)
    if i%100 == 0:
        train_accuracy = accuracy.eval(feed_dict={
            x:batch[0], y_: batch[1], keep_prob: 1.0})
        print("step %d, training accuracy %g"%(i, train_accuracy))
    train_step.run(feed_dict={x: batch[0], y_: batch[1], keep_prob: 0.5})
    gradient.updateProgress("DeepMNIST", i, 20000)
   
print("test accuracy %g"%accuracy.eval(feed_dict={
    x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))
```
