# Gradient


## Getting Started
There are roughly 3 components in this project

* A **nodejs web server** which will host the website
* A **MongoDB server** which will store the data 
(normally, nodejs webserver and MongoDB server would run on same machine, however, you can also configure with different settings)
*  **Clients**  (GPU servers) which will send *GPU data* and *learning progress data*.


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




### Progress API usage
`import gradient`
`gradient.registerProgress("DeepMNIST")` (parameters : *name*)
`gradient.updateProgress("DeepMNIST", i, 20000)` (parameters : *name*, *current_iteration*, *maximum_iteration*)
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
